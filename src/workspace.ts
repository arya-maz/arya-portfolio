const header = document.querySelector<HTMLElement>('.site-header')!;
const menuButton = header.querySelector<HTMLButtonElement>('.menu-toggle')!;
const menu = header.querySelector<HTMLElement>('.mobile-nav')!;
const tabs = header.querySelectorAll<HTMLAnchorElement>('[data-folder-tab]');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const ambientPointer = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
let focusMain = false;

function setMenu(open: boolean) {
  menu.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
}

menuButton.hidden = false;
menuButton.addEventListener('click', () => setMenu(menu.hidden));
document.addEventListener('click', event => {
  if (!(event.target instanceof Element) || menu.hidden) return;
  if (event.target.closest('.mobile-nav a') || (!menu.contains(event.target) && !menuButton.contains(event.target))) {
    setMenu(false);
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !menu.hidden) {
    setMenu(false);
    menuButton.focus();
  }
});
matchMedia('(min-width: 600px)').addEventListener('change', () => setMenu(false));

function folderIndex(root: Document) {
  return Number(root.querySelector<HTMLElement>('[data-folder-index]')?.dataset.folderIndex);
}

document.addEventListener('astro:before-preparation', event => {
  if (reducedMotion.matches) return;
  const load = event.loader;
  event.loader = async () => {
    await load();
    if (event.signal.aborted || event.defaultPrevented || reducedMotion.matches) return;

    const delta = folderIndex(event.newDocument) - folderIndex(document);
    const content = document.querySelector<HTMLElement>('.folder-content');
    if (!content || !delta) return;

    content.dataset.folderExit = delta < 0 ? 'right' : 'left';
    event.signal.addEventListener('abort', () => delete content.dataset.folderExit, { once: true });
    const exit = content.getAnimations().find(animation =>
      animation instanceof CSSAnimation && animation.animationName === 'route-out'
    );
    await exit?.finished.catch(() => { /* A newer navigation took over. */ });
  };
});

document.addEventListener('astro:before-swap', event => {
  const delta = folderIndex(event.newDocument) - folderIndex(document);
  const incoming = event.newDocument.documentElement;
  incoming.dataset.folderDirection = delta < 0 ? 'left' : 'right';
  if (delta && !reducedMotion.matches) incoming.dataset.folderEnter = '';
  focusMain = !event.to.hash && (event.navigationType !== 'traverse' || document.activeElement !== document.body);
  // Animate live content so controls are clickable as soon as the new page is visible.
  void event.viewTransition.ready.catch(() => { /* Expected when skipping the snapshot. */ });
  event.viewTransition.skipTransition();
});

document.addEventListener('astro:after-swap', () => {
  setMenu(false);
  const active = folderIndex(document);
  for (const tab of tabs) {
    if (Number(tab.dataset.folderTab) === active) tab.setAttribute('aria-current', 'page');
    else tab.removeAttribute('aria-current');
  }
  if (focusMain) document.querySelector<HTMLElement>('#main')?.focus({ preventScroll: true });
  resetLighting();
});

// The gradient itself stays static. Interpolate only the position and opacity of its layer.
let frame = 0;
let litFolder: HTMLElement | null = null;
let currentX = 0;
let currentY = 0;
let targetX = 0;
let targetY = 0;

function resetLighting() {
  cancelAnimationFrame(frame);
  frame = 0;
  litFolder?.removeAttribute('data-lit');
  litFolder = null;
}

function moveLight() {
  frame = 0;
  if (!litFolder) return;
  currentX += (targetX - currentX) * 0.16;
  currentY += (targetY - currentY) * 0.16;
  litFolder.style.setProperty('--light-x', `${currentX.toFixed(1)}px`);
  litFolder.style.setProperty('--light-y', `${currentY.toFixed(1)}px`);
  if (Math.abs(currentX - targetX) + Math.abs(currentY - targetY) > 0.5) {
    frame = requestAnimationFrame(moveLight);
  }
}

document.addEventListener('pointermove', event => {
  if (!ambientPointer.matches || event.pointerType === 'touch') return;
  const folder = event.target instanceof Element ? event.target.closest<HTMLElement>('.folder') : null;
  if (!folder) {
    if (litFolder) resetLighting();
    return;
  }
  const bounds = folder.getBoundingClientRect();
  targetX = event.clientX - bounds.left;
  targetY = event.clientY - bounds.top;
  if (litFolder !== folder) {
    litFolder = folder;
    currentX = targetX;
    currentY = targetY;
    folder.dataset.lit = '';
  }
  if (!frame) frame = requestAnimationFrame(moveLight);
}, { passive: true });

document.addEventListener('pointerleave', resetLighting);
ambientPointer.addEventListener('change', resetLighting);

// Register once so contact controls are ready as soon as the router swaps the page.
document.addEventListener('click', event => {
  if (!(event.target instanceof Element)) return;
  const toggle = event.target.closest<HTMLButtonElement>('[data-contact-toggle]');
  if (!toggle) return;
  const panel = document.querySelector<HTMLElement>('#contact-panel');
  if (!panel) return;
  const opening = panel.hidden;
  panel.hidden = !opening;
  toggle.setAttribute('aria-expanded', String(opening));
  toggle.setAttribute('aria-label', opening ? 'Hide contact form' : 'Show contact form');
  if (opening) {
    panel.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest' });
    panel.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true });
  }
});

document.addEventListener('submit', async event => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || !form.matches('[data-contact-form]')) return;
  event.preventDefault();
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const status = form.querySelector<HTMLElement>('.contact-status');
  if (!form.hasAttribute('action') || !button || button.disabled || !status || !form.reportValidity()) return;
  button.disabled = true;
  button.textContent = 'Sending…';
  status.textContent = '';
  try {
    const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('Submission failed');
    form.reset();
    status.textContent = 'Thanks! Your message has been sent.';
  } catch {
    status.textContent = 'Your message could not be sent. Please try again. Your text is still here.';
  } finally {
    button.disabled = false;
    button.textContent = 'Send message';
  }
});
