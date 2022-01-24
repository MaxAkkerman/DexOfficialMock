import { ClickAwayListener } from '@mui/base';
import { Portal } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';

import CloseBtn from '../CloseBtn';
import Loader from '../Loader';
import MainBlock from '../MainBlock';
import SearchInput from '../SearchInput';
import SelectItem from '../SelectItem';
import includesTextInToken from '../../utils/includesTextInToken';

import classes from './index.module.scss';

export default function SelectPopup({ loading, onClose, onSelect, tokens,title,type }) {
  const [searchWord, setSearchWord] = useState('');
  console.log('tokens', tokens);
  const filteredTokens = useMemo(
    () =>
      tokens
        // .sort((a, b) => b.balance - a.balance)
        .filter((t) => includesTextInToken(t, searchWord)),
    [tokens, searchWord],
  );

  function handleTokenSelect(e, t) {
    onSelect(e, t);
    onClose(e);
  }

  return (
    <Portal>
      <div className={classes['select-wrapper']}>
        <ClickAwayListener onClickAway={onClose}>
          <MainBlock
            title={title}
            button={<CloseBtn onClick={onClose} />}
            content={
              loading ? (
                  <>
                <Loader className={classes.loader} />
                {type === "bridge" ? <div className={classes.bridgeLoaderText}><p>Loading token list, please wait...</p></div> : null}
                </>
              ) : (
                <>
                  <SearchInput
                    onChange={(e) => setSearchWord(e.target.value)}
                  />
                  <div className={classes['select-list']}>
                    {!filteredTokens.length && (
                      <p style={{ textAlign: 'center' }}>No tokens found</p>
                    )}
                    {filteredTokens.map((t) => (
                      <SelectItem
                        token={t}
                        key={t.rootAddress}
                        onClick={(e) => handleTokenSelect(e, t)}
                      />
                    ))}
                  </div>
                </>
              )
            }
          />
        </ClickAwayListener>
      </div>
    </Portal>
  );
}

SelectPopup.propTypes = {
  loading: PropTypes.bool,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
  tokens: PropTypes.array,
};

SelectPopup.defaultProps = {
  loading: false,
  onClose: () => {},
  onSelect: () => {},
  tokens: [],
    title: "Select a token"
};
