import './index.scss';

import { FormHelperText } from '@mui/material';
import cls from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

function MainBlock(
  {
    button,
    class: className,
    classHeader,
    classTitle,
    content,
    error,
    footer,
    helperText,
    normalTitle,
    smallTitle,
    title,
    ...rest
  },
  ref,
) {
  return (
    <div className="mainblock-wrapper">
      <div
        className={cls('mainblock', className)}
        style={{
          borderColor: error ? 'var(--error)' : 'var(--mainblock-border-color)',
        }}
        ref={ref}
        {...rest}
      >
        {(title || button) && (
          <div className={cls('mainblock-header', classHeader)}>
            <h2
              className={cls('mainblock-title', classTitle, {
                'mainblock-title--normal': normalTitle,
                'mainblock-title--small': smallTitle,
              })}
            >
              {title}
            </h2>
            {button}
          </div>
        )}
        {content}
        {footer}
      </div>
      {helperText && (
        <FormHelperText
          error={error}
          style={{
            textAlign: 'center',
          }}
        >
          {helperText}
        </FormHelperText>
      )}
    </div>
  );
}

MainBlock.propTypes = {
  button: PropTypes.element,
  class: PropTypes.string,
  classHeader: PropTypes.string,
  classTitle: PropTypes.string,
  content: PropTypes.element.isRequired,
  error: PropTypes.bool,
  footer: PropTypes.element,
  helperText: PropTypes.string,
  normalTitle: PropTypes.string,
  smallTitle: PropTypes.string,
  title: PropTypes.string,
};

MainBlock.defaultProps = {
  button: null,
  class: null,
  classHeader: null,
  classTitle: null,
  error: false,
  footer: null,
  helperText: null,
  normalTitle: null,
  smallTitle: null,
  title: null,
};

export default React.forwardRef(MainBlock);
