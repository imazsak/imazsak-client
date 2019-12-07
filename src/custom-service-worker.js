importScripts('./ngsw-worker.js');

// https://stackoverflow.com/a/55757617
(function () {
  'use strict';

  self.addEventListener('notificationclick', (event) => {
    if (clients.openWindow) {
      event.waitUntil(clients.openWindow('/notifications'));
    }
  });}
());
