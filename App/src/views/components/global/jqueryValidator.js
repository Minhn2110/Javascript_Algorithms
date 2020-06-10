const JqueryValidator = {
  addMethodJqueryValidator: () => {
    jQuery.validator.addMethod('decimalNumber', (value, element) => {
      const re = /^[0-9]\d*(\,\d+)?$/;
      if (re.test(value)) {
        return true;
      }
      return false;
    }, 'Sai định dạng decimalNumber');
    jQuery.validator.addMethod('decimalNumberRange', (value, element) => {
      const re = value.replace(',', '.');
      const reNumber = parseFloat(re);

      if (reNumber > 0 && reNumber <= 100) {
        console.log('reNumber', reNumber);
        return true;
      }
      console.log('reNumber', reNumber);
      return false;
    }, 'Sai định dạng decimalNumber');
    jQuery.validator.addMethod('lettersonly', function (value, element) {
      return this.optional(element) || /^[a-z àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ, " "]+$/i.test(value);
    }, 'Xin vui lòng nhập chữ cái');
    jQuery.validator.addMethod('letterEnglishsonly', function (value, element) {
      return this.optional(element) || /^[a-z, ""]+$/i.test(value);
    }, 'Xin vui lòng nhập ký tự không dấu, không có khoảng trống và không có chữ số');
    jQuery.validator.addMethod('dateFormat', function (value, element) {
      let check = false;
      const re = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
      if (re.test(value)) {
        const adata = value.split('/');
        const dd = parseInt(adata[0], 10);
        const mm = parseInt(adata[1], 10);
        const yyyy = parseInt(adata[2], 10);
        const xdata = new Date(yyyy, mm - 1, dd);
        if ((xdata.getFullYear() === yyyy) && (xdata.getMonth() === mm - 1) && (xdata.getDate() === dd)) {
          check = true;
        } else {
          check = false;
        }
      } else {
        check = false;
      }
      return this.optional(element) || check;
    }, 'Sai định dạng');
    jQuery.validator.addMethod('greaterThan', (value, element, params) => {
      if (!/Invalid|NaN/.test(new Date(value))) {
        return new Date(value) >= new Date($(params).val());
      }
      return isNaN(value) && isNaN($(params).val())
        || (Number(value) >= Number($(params).val()));
    }, 'Giá trị max phải lớn hơn giá trị min');
    jQuery.validator.addMethod('smallerThan', (value, element, params) => {
      if (!/Invalid|NaN/.test(new Date(value))) {
        return new Date(value) <= new Date($(params).val());
      }
      return isNaN(value) && isNaN($(params).val()) || (Number(value) <= Number($(params).val()));
    }, 'Giá trị min phải nhỏ hơn giá trị max');
    jQuery.validator.addMethod('specialChars', (value, element) => {
      const regex = new RegExp('^[a-zA-Z0-9_àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ ]+$');
      // const regex = new Request('^[\S]+(\s[\S]+)*$');
      const key = value;
      if (!regex.test(key)) {
        return false;
      }
      return true;
    }, 'Xin vui lòng không nhập ký tự đặc biệt');
    jQuery.validator.addMethod('noSpace', (value, element) => value.indexOf(' ') < 0 && value !== '', 'Xin vui lòng không nhập khoảng trống');
    jQuery.validator.addMethod('requiredNotBlank', function (value, element) {
      return $.validator.methods.required.call(this, $.trim(value), element);
    }, 'Xin vui lòng nhập');
    jQuery.validator.addMethod('requiredNotBlankSummerNote', function (value, element) {
      const a = value.replace(/&nbsp;/g, ' ');
      return $.validator.methods.required.call(this, $.trim(a), element);
    }, 'Xin vui lòng nhập');
    jQuery.validator.addMethod('isEmail', (value, element) => {
      const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailReg.test(value);
    }, 'Vui lòng nhập đúng định dạng email');
    jQuery.validator.addMethod('fileName', function (value, element) {
      // allow any non-whitespace characters as the host part
      return this.optional(element) || /(.jpg|.png|.jpeg|.pdf)$/.test(value);
    }, 'Vui lòng chọn đúng định dạng: .png , .jpg , .jpeg , .pdf');
    jQuery.validator.addMethod('fileNameUploadRecon', function (value, element) {
      // allow any non-whitespace characters as the host part
      return this.optional(element) || /(.xsl|.xlsx|.csv)$/.test(value);
    }, 'Vui lòng chọn đúng định dạng: .xsl , .xlsx , .csv');
    jQuery.extend(jQuery.validator.messages, {
      maxlength: jQuery.validator.format('Xin vui lòng nhập ko quá {0} chữ cái.'),
      minlength: jQuery.validator.format('Xin vui lòng nhập ít nhất {0} chữ cái.')
    });
    $.validator.addMethod('filesize', function (value, element, param) {
      return this.optional(element) || (element.files[0].size <= param * 1024 * 1024);
    }, 'Vui lòng không chọn lớn hơn {0}MB');
    jQuery.validator.setDefaults({ ignore: ':hidden:not(#summernote),.note-editable.panel-body' });
  },
};

export default JqueryValidator;
