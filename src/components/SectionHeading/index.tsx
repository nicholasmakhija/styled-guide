import React from 'react';

import { throwError } from '@utils/get-resource';
import {
  SectionHeadingRoot,
  SectionHeadingText,
  SectionHeadingButton
} from './elements';

function copyToClipboard(id: string) {
  const { hash, href } = window.location;
  const text = hash
    ? href.replace(hash, '')
    : href;

  navigator
    .clipboard
    .writeText(`${text}#${id}`)
    .then(() => {
      // DEBUG:
      // eslint-disable-next-line no-console
      console.log(`clipboard text: ${text}#${id}`);
    })
    .catch(throwError);
}

export const SectionHeading = ({
  id,
  title
}: SectionHeadingProps) => {
  const clickHandler = () => {
    copyToClipboard(id);
  };

  return (
    <SectionHeadingRoot>
      <SectionHeadingText id={id}>{title}</SectionHeadingText>
      <SectionHeadingButton onClick={clickHandler}>#</SectionHeadingButton>
    </SectionHeadingRoot>
  );
};
