import { Accessibility, AccessibilityAttributes, imageBehavior, ImageBehaviorProps } from '@fluentui/accessibility';
import {
  ComponentWithAs,
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useFluentContext,
  useTelemetry,
} from '@fluentui/react-bindings';
import { makeStyles } from '@fluentui/react-theme-provider';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { createShorthandFactory, UIComponentProps, commonPropTypes, pxToRem } from '../../utils';
import { FluentComponentStaticProps } from '../../types';

export interface ImageProps extends UIComponentProps, ImageBehaviorProps {
  /** Alternative text. */
  alt?: string;

  'aria-label'?: AccessibilityAttributes['aria-label'];

  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<ImageBehaviorProps>;

  /** An image may be formatted to appear inline with text as an avatar. */
  avatar?: boolean;

  /** An image can appear circular. */
  circular?: boolean;

  /** An image can take up the width of its container. */
  fluid?: boolean;

  /** Image source URL. */
  src?: string;
}

export type ImageStylesProps = Pick<ImageProps, 'avatar' | 'circular' | 'fluid'>;
export const imageClassName = 'ui-image';

const useImageStyles = makeStyles([
  [
    null,
    {
      boxSizing: 'border-box',
      display: 'inline-block',
      height: 'auto',
      verticalAlign: 'middle',
    },
  ],

  [{ avatar: true }, { borderRadius: pxToRem(9999), width: pxToRem(32) }],
  [{ circular: true }, { borderRadius: pxToRem(9999) }],

  [{ fluid: true }, { width: '100%' }],
]);

const staticImageStyles = [
  [
    null,
    null,
    {
      boxSizing: ['a1ewtqcl', '.a1ewtqcl{box-sizing:border-box;}'],
      display: ['a14t3ns0', '.a14t3ns0{display:inline-block;}'],
      height: ['a11ysow2', '.a11ysow2{height:auto;}'],
      verticalAlign: ['amrv4ls', '.amrv4ls{vertical-align:middle;}'],
    },
  ],

  [
    { avatar: true },
    null,
    {
      borderRadius: ['a10yvfpk', '.a10yvfpk{border-radius:714.2143rem;}'],
      width: ['a10vq2gu', '.a10vq2gu{width:2.2857rem;}'],
    },
  ],
  [{ circular: true }, null, { borderRadius: ['a10yvfpk', '.a10yvfpk{border-radius:714.2143rem;}'] }],
  [{ fluid: true }, null, { width: ['aly5x3f', '.aly5x3f{width:100%;}'] }],
];
const useStaticImageStyles = makeStyles(staticImageStyles);

/**
 * An Image is a graphic representation of something.
 *
 * @accessibility
 * If image should be visible to screen readers, textual representation needs to be provided in 'alt' property.
 *
 * Other considerations:
 *  - when alt property is empty, then Narrator in scan mode navigates to image and narrates it as empty paragraph.
 *  - when image has role='presentation' then screen readers navigate to the element in scan/virtual mode. To avoid this, the attribute "aria-hidden='true'" is applied by the default image behavior.
 *  - when alt property is used in combination with aria-label, arialabbeledby or title, additional screen readers verification is needed as each screen reader handles this combination differently.
 */
export const Image: ComponentWithAs<'img', ImageProps> & FluentComponentStaticProps<ImageProps> = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Image.displayName, context.telemetry);
  setStart();

  const { accessibility, alt, 'aria-label': ariaLabel, avatar, circular, className, fluid } = props;

  const getA11Props = useAccessibility(accessibility, {
    debugName: Image.displayName,
    mapPropsToBehavior: () => ({
      alt,
      'aria-label': ariaLabel,
    }),
    rtl: context.rtl,
  });
  const rootClassName = useStaticImageStyles({ avatar, circular, fluid }, imageClassName, className);

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Image.handledProps, props);

  const result = <ElementType {...getA11Props('root', { className: rootClassName, ...unhandledProps })} />;

  setEnd();

  return result;
};

Image.displayName = 'Image';
Image.defaultProps = {
  as: 'img',
  accessibility: imageBehavior,
};

Image.propTypes = {
  ...commonPropTypes.createCommon({
    children: false,
    content: false,
  }),
  avatar: PropTypes.bool,
  circular: PropTypes.bool,
  fluid: PropTypes.bool,
};

Image.handledProps = Object.keys(Image.propTypes) as any;

Image.create = createShorthandFactory({ Component: Image, mappedProp: 'src', allowsJSX: false });
