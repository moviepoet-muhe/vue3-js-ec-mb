<template>
  <div class="mine">
    <div class="mine-base-info">
      <div class="bg">
        <div class="info">
          <div class="avatar">
            <van-image round width="64px" height="64px" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
          </div>
          <div class="content">
            <div class="nickname">测试测试</div>
            <div class="phone">19980434346</div>
          </div>
        </div>
      </div>
      <div class="setting">
        <van-icon name="setting-o" />
      </div>
      <div class="link">
        <van-grid :border="false" :column-num="3">
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mine'
}
</script>

<style lang='less' scoped>
.mine {
  background: #f5f5f5;

  .mine-base-info {
    height: 66.66667vw;
    width: 100%;
    position: relative;

    .bg {
      overflow: hidden;
      position: relative;
      height: 200px;
      display: flex;
      border-radius: 0 0 30% 30%;
      background: rgba(216, 30, 6, .9);

      .info {
        margin: auto;
        display: flex;
        width: 80vw;
        align-items: center;
        color: #fff;
        font-size: 4.8vw;
        font-weight: 700;

        .content {
          margin-left: 2.66667vw;

          .phone {
            font-size: 3.73333vw;
            font-weight: 400;
          }
        }

      }
    }

    .setting {
      position: absolute;
      top: 5.33333vw;
      right: 5.33333vw;

      .van-icon {
        color: rgb(255, 255, 255);
        font-size: 28px;
      }
    }

    .link {
      width: 66.66667vw;
      position: absolute;
      top: 40vw;
      left: 0;
      right: 0;
      margin: 0 auto;
      overflow: hidden;
      border-radius: 2.13333vw;
    }

  }

}
</style>
