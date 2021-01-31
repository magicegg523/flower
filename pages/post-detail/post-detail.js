// pages/post-detail/post-detail.js
import { postList } from '../../data/data'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData: {},
    isPlaying: false,
    _mgr: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const pid = options.pid
    const postData = postList[pid]
    this.setData({
      postData,
      isPlaying: this.currentMusicIsPlaying()
    })

    const mgr = wx.getBackgroundAudioManager()
    this.data._mgr = mgr
    mgr.onPlay(this.onMusicStart)
    mgr.onPause(this.onMusicStop)
  },

  async onCollect() {
    // wx.showToast({
    //   title: '收藏成功'
    // })
    const result = await wx.showModal({
      title: '是否收藏'
    })
    console.log(result)
  },

  currentMusicIsPlaying() {
    if (app.globalData.gIsPlayingMusic) {
      if (app.globalData.gIsPlayindPostId === this.data.postData.postId) {
        return true
      }
      return false
    }
    return false
  },

  onMusicStart() {
    const mgr = this.data._mgr

    mgr.src = this.data.postData.music.url
    mgr.title = this.data.postData.music.title
    mgr.coverImgUrl = this.data.postData.music.coverImg

    app.globalData.gIsPlayingMusic = true
    app.globalData.gIsPlayindPostId = this.data.postData.postId

    this.setData({
      isPlaying: true
    })
  },

  onMusicStop() {
    const mgr = this.data._mgr
    mgr.stop()
    app.globalData.gIsPlayingMusic = false
    app.globalData.gIsPlayindPostId = -1
    this.setData({
      isPlaying: false
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})