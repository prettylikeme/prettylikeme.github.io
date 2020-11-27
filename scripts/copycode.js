(function($){
  // 代码片段添加复制功能
  $('.highlight').each((i, el) => {
    const lang = el.classList[1];
    let copy = $(`<div></div>`);
    copy.css({
      position: 'absolute',
      zIndex: '999',
      top: '4px',
      left: '7px',
      userSelect: 'none',
      padding: '2px 10px',
      color: '#888',
      cursor: 'pointer',
      borderRadius: '5px',
    });
    let text = $(`<span>${lang}</span>`);
    copy.append(text);
    copy.hover(() => {
      copy.css({ color: '#aaa', background: '#3d3d3d' });
    }, () => {
      copy.css({ color: '#888', background: 'unset' });
    })
    $(el).hover(() => {
      text.text('点我复制');

    }, () => {
      text.text(lang);
    })
    $(el).css({'position': 'relative', 'padding-top': '2em'});
    copy.click(() => {
      // 创建 createRange 方法对象
      let range = document.createRange();
      // 创建 getSelection 方法对象，表示用户选择的文本范围或光标的当前位置。
      let selection = window.getSelection();
      // 通过 selection.removeAllRanges() 方法清除选择范围
      selection.removeAllRanges();
      // selectNodeContents 方法选择 contentHolder 子节点的内容
      // 这里指 p 标签中的文本节点内容
      Array.from($('.code', el)).forEach(e => {
        range.selectNodeContents(e);
      })
      // 一个区域（Range）对象将被增加到选区（Selection）当中。
      // 将刚刚选中的 p 标签文本添加到 selection 
      selection.addRange(range);
      // execCommand 中的 copy 方法拷贝刚刚选到的内容
      document.execCommand('copy');
      // 重新初始化区域对象 range
      selection.removeAllRanges();
      let copied = $('<div>复制成功</div>')
      copied.css({
        position: 'absolute',
        zIndex: '999',
        top: '0',
        right: '0',
        userSelect: 'none',
        padding: '2px 10px',
        color: '#aaa',
        background: '#3d3d3d',
        cursor: 'pointer',
        borderRadius: '5px',
        whiteSpace: 'nowrap',
      });
      copy.append(copied);
      setTimeout(() => {
        copied.remove();
      }, 3000);
    })
    $(el).append(copy);
  });
})(jQuery);