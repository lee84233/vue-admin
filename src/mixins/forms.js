/**
 * form 表单，常用方法
 * 引入：import forms from '@/mixins/forms'
 * 使用：mixins: [forms]
 */
export default {
  data() {
    return {
      // 日期控件格式
      dateValueFormat: 'yyyy-MM-dd',
      // 日期控件：日期只能选择到今天
      datePickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  methods: {
    /**
     * getRules 的 快捷方式
     *
     * @param {String} formKey 要验证的 form 对象
     * @param {Array} excludeKeys 忽略字段，选填
     * @returns {Object}
     */
    getFormRules(formKey, excludeKeys = []) {
      let allFieldList = Object.keys(eval(`this.${formKey}`)) // eslint-disable-line
      if (allFieldList && allFieldList.length) {
        let fieldList = allFieldList
        if (excludeKeys.length) {
          fieldList = allFieldList.filter(item => !excludeKeys.includes(item))
        }

        return this.getRules(fieldList)
      } else {
        return {}
      }
    },

    /**
     * 获取表单验证规则
     * 入参格式1：['name', 'age', ...]
     * 入参格式2：
     * {
     *   key: 'userName', // 必填
     *   message: '请输入xxx', // 选填，字段名
     *   type: '' // 选填，格式，可选值：url | email
     * }
     *
     * @param {Array} list 验证字段数组，
     * @returns {Object} 规则对象
     */
    getRules(list, trigger = 'change') {
      /**
       * {
       *   key: 'userName', // 必填
       *   message: '请输入xxx', // 选填，字段名
       *   type: '' // 选填，url | email
       * }
       */
      let rules = {}
      list.forEach(item => {
        if (typeof item === 'string') {
          rules[item] = [
            { required: true, trigger, message: '请输入内容' }
          ]
        } else {
          rules[item.key] = [
            { required: true, trigger, message: `请输入${item.message || '内容'}` }
          ]

          if (['url', 'email'].includes(item.type)) {
            rules[item.key].push({
              type: item.type, trigger, message: `请输入正确的格式`
            })
          }
        }
      })
      return rules
    }
  }
}
