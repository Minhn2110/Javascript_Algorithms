
import { arr } from './checkbox-data';

export const Checkbox = {
  init: () => {
    if ($('.checkbox-groups').length > 0) {
      Checkbox.renderCbxGroups();
      Checkbox.recursionCbxChecked();
    }
  },
  recursionCbxChecked: () => {
    $('li :checkbox').on('click', (e) => {
      const $this = e.currentTarget;
      let $chk = $($this);
      let $li = $chk.closest('li');
      let $ul;
      let $parent;

      if ($li.has('ul')) {
        $li.find(':checkbox').not($this).prop('checked', $this.checked);
      }
      do {
        $ul = $li.parent();
        $parent = $ul.siblings(':checkbox');
        if ($chk.is(':checked')) {
          $parent.prop('checked', $ul.has(':checkbox:not(:checked)').length == 0);
        } else {
          $parent.prop('checked', false);
        }
        $chk = $parent;
        $li = $chk.closest('li');
      } while ($ul.is(':not(.someclass)'));
    });
  },
  renderCbxGroups() {
    const parent = document.querySelector('.parent');
    parent.innerHTML = '';
    parent.innerHTML += Checkbox.recursionbindCbx(arr);
  },
  getValue() {
    const selectedItem = [];
    Array.from($('input:checked')).forEach((val) => {
      if ($($(val).parent()[0]).has('ul').length === 0) {
        selectedItem.push($(val).val());
      }
    });
    console.log(selectedItem);
    // console.log(selectedItem.filter((v, i, a) => a.indexOf(v) === i));
  },
  recursionbindCbx(item) {
    let returnCbxGroups = '';
    if (item) {
      item.forEach((element) => {
        returnCbxGroups += `
                <li>
                    <label>${element.name}</label>
                    <input id="cbx_${element.value}" type="checkbox" value=${element.value} ${element.checked ? 'checked' : ''}/>
                    ${element.child ? `<ul>${Checkbox.recursionbindCbx(element.child)}</ul>` : ''}
                </li>
            `;
      });
    }
    return returnCbxGroups;
  },
};

export default Checkbox;
