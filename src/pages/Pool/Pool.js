import './Pool.scss';

import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import LiquidityItem from '../../components/LiquidityItem/LiquidityItem';
import MainBlock from '../../components/MainBlock/MainBlock';

function Pool() {
  const navigate = useNavigate();
  const clientData = useSelector((state) => state.walletReducer.clientData);

  const walletIsConnected = useSelector(
    (state) => state.appReducer.walletIsConnected,
  );
  const tokens = useSelector((state) => state.tonData.tokens);
  const pairs = useSelector((state) => state.tonData.pairs);

  const pairsWithBalance = useMemo(() => {
    const dsTokens = tokens.filter((t) => t.symbol.startsWith('DS'));
    return pairs.map((p) => {
      const token = dsTokens.find((t) => {
        const onlySymbols = t.symbol.replace(/^DS-/, '');
        const [symbolA, symbolB] = onlySymbols.split('/');

        if (symbolA === p.symbolA && symbolB === p.symbolB) return t;
      });

      if (token)
        return {
          ...p,
          balance: token.balance,
        };

      return {
        ...p,
        balance: 0,
      };
    });
  }, [tokens, pairs]);

  function handleClickCreatePair() {
    navigate('/create-pair');
  }

  return (
    <div className="container">
      <MainBlock
        class={'pool'}
        title="Liquidity pools"
        button={
          
          <Link
            to="/"
            onClick={walletIsConnected ? () => handleClickCreatePair() : null}
            className={`btn liquidity-btn ${
              walletIsConnected ? null : 'btn--disabled'
            }`}
            // style={{fontSize: "20px", borderRadius: "12px"}}
          >
            Create Pair
          </Link>
        }
        content={
          !walletIsConnected ? (
            <button
              className="btn mainblock-btn"
              onClick={() => navigate('/account')}
            >
              {!clientData.status && clientData.address.length === 66
                ? 'Deploy wallet'
                : 'Connect wallet'}
            </button>
          ) : (
            <div className="pool-wrapper">
              {!pairs.length
                ? 'You don’t have liquidity pairs yet'
                : pairsWithBalance.map((p) => (
                    <LiquidityItem
                      symbols={[p.symbolA, p.symbolB]}
                      balance={p.balance}
                      key={p.walletAddress}
                    />
                  ))}
            </div>
          )
        }
      />
    </div>
  );
}

export default Pool;
