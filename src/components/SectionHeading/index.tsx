import React, { useState } from 'react';

import { throwError } from '@utils/get-resource';
import {
  SectionHeadingRoot,
  SectionHeadingAction,
  SectionHeadingText,
  SectionHeadingTooltip,
  SectionHeadingButton
} from './elements';

function copyToClipboard(id: string) {
  const { hash, href } = window.location;
  const text = hash
    ? href.replace(hash, '')
    : href;

  return navigator
    .clipboard
    .writeText(`${text}#${id}`)
    .catch(throwError);
}

export const SectionHeading = ({
  id,
  title
}: SectionHeadingProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const clickHandler = () => {
    copyToClipboard(id).then(() => {
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 1500);
    });
  };

  return (
    <SectionHeadingRoot>
      <SectionHeadingText {...(id && { id })}>{title}</SectionHeadingText>
      {id && (
        <SectionHeadingAction>
          <SectionHeadingTooltip
            aria-hidden={true}
            isVisible={isVisible}
          >
            Link copied!
          </SectionHeadingTooltip>
          <SectionHeadingButton
            aria-label={`Copy link to ${title}`}
            onClick={clickHandler}
          >
            #
          </SectionHeadingButton>
        </SectionHeadingAction>
      )}
    </SectionHeadingRoot>
  );
};
