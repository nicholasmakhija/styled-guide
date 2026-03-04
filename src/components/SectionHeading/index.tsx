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
      // TODO: setState of toggletip to hide after 500ms?
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
      <SectionHeadingText {...(id && { id })}>{title}</SectionHeadingText>
      {id && (<SectionHeadingButton onClick={clickHandler}>#</SectionHeadingButton>)}
    </SectionHeadingRoot>
  );
};
