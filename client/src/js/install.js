const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;
// Logic for installing the PWA
if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
    butInstall.classList.toggle('hidden', true);
  }
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
  });
// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (!deferredPrompt) {
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      deferredPrompt = null;
      butInstall.classList.toggle('hidden', true);
    }
  });
// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    butInstall.classList.toggle('hidden', true);
  });