import cls from 'classnames';

function BlockItem({
  amount_left_block,
  className,
  leftBlockBottom,
  leftTitle,
  rightBottomBlock,
  rightTopBlock,
  ...rest
}) {
  return (
    <div className={cls('amount_wrapper', className)}>
      <div
        className={amount_left_block ? amount_left_block : 'amount_left_block'}
      >
        <div className="send_text_headers">{leftTitle}</div>
        {leftBlockBottom}

        {/*<div className={cls("amount_wrapper", className)} {...rest}>*/}
        {/*	<div className="amount_left_block">*/}
        {/*		<div className="send_text_headers">{leftTitle}</div>*/}
        {/*		{leftBlockBottom}*/}
      </div>
      <div className="amount_right_block">
        {rightTopBlock}
        {rightBottomBlock}
      </div>
    </div>
  );
}

export default BlockItem;
