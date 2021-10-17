const app = getApp()

Page({
  data: {
    tabs: [{
      id: 0,
      name: 'First'
    }, {
      id: 1,
      name: 'Second'
    }],
    active: 0,
    param: {
      "pageSize": 10,
      "pageNum": 1
    },
    list: {},
    page: {}
  },
  onLoad() {
    this.getFirst(0)
  },
  change (e) {
    let { id } = e.currentTarget.dataset
    this.setData({
      active: id
    })
    if (id === 1 && !this.data.list[id]) {
      this.getSecond()
    }
  },
  getList () {
    let pageCount = this.data.active === 0 ? 10 : 20
    const {pageSize, pageNum} = this.data.param
    wx.request({
      url: `https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?number=${pageSize}&pageNum=${pageNum}&tab=${this.data.active}`,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        const result = res.data
        let k = `list.${this.data.active}[${pageNum}]`
        let pagek = `page.${this.data.active}`
        let obj = Object.assign({}, { pageNum: pageNum, pageCount})
        this.setData({
          [k]: result,
          [pagek]: obj
        })
        console.log(this.data.list)
      }
    })
  },
  getFirst () {
    let num = this.data.page[this.data.active] ? this.data.page[this.data.active].pageNum : 1
    this.setData({
      active: 0,
      'param.pageNum': num
    })
    this.lock = true
    this.getList()
  },
  getSecond () {
    let num = this.data.page[this.data.active] ? this.data.page[this.data.active].pageNum : 1
    this.setData({
      active: 1,
      'param.pageNum': num
    })
    this.lock = true
    this.getList()
  },
  load () {
    const {pageNum, pageCount} = this.data.page[this.data.active]
    let pag = pageNum + 1
    if ( pag <= pageCount) {
      this.lock = false
      this.setData({
        'param.pageNum': pag
      })
      this.getList()
    }
  }
})
