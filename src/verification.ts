// @ts-expect-error -- wrong type export
import { Veriff } from '@veriff/js-sdk';

import { createVeriffFrame, MESSAGES } from '@veriff/incontext-sdk';

function init() {
  const veriff = Veriff({
    host: import.meta.env.VITE_VERIFF_HOST,
    apiKey: import.meta.env.VITE_VERIFF_API_KEY,
    parentId: 'veriff-root',
    onSession: function (err: unknown, response: { verification: { url: string } }) {
      if (err) {
        console.error('Error creating session', err);
        return;
      }
      if (response.verification) {
        console.log('Session created', response.verification.url);
      }

      createVeriffFrame({ url: response.verification.url });
    },
    onEvent: function (msg: MESSAGES) {
      switch (msg) {
        case MESSAGES.STARTED:
          console.log('Verification started');
          break;
        case MESSAGES.SUBMITTED:
          console.log('Verification submitted');
          break;
        case MESSAGES.FINISHED:
          console.log('Verification finished');
          break;
        case MESSAGES.CANCELED:
          console.log('Verification closed');
          break;
        case MESSAGES.RELOAD_REQUEST:
          console.log('Verification reloaded');
          break;
      }
    },
  });

  veriff.setParams({
    person: {
      givenName: 'Sirius',
      lastName: 'Black',
    },
    vendorData: '7eb19312-79d6-11ec-90d6-0242ac120003'
  });

  veriff.mount({
    submitBtnText: "Let's go",
  });
}

export function startVerification(element: HTMLButtonElement) {

  element.innerHTML = "start verification"

  element.addEventListener('click', () => init())
}
