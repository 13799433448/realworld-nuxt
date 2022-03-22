<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="userInfo.image" />
            <h4>{{ userInfo.username }}</h4>
            <p v-html="userInfo.bio">{{ userInfo.bio }}</p>
            <button class="btn btn-sm btn-outline-secondary action-btn" @click="toGithub">
              <i class="ion-plus-round"></i>
              &nbsp;
              Follow {{ userInfo.username }}
            </button>
          </div>

        </div>
      </div>
    </div>
    
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <el-tabs v-model="activeName">
            <el-tab-pane label="My Articles" name="first">
              <MyArticles/>
            </el-tab-pane>
            <el-tab-pane label="Favorited Articles" name="second">
              <MyFavorited/>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getUser } from "@/api/user";
import MyArticles from './components/my-articles'
import MyFavorited from './components/my-favorited'
export default {
  middleware: 'authenticated',
  name: 'UserProfile',
  components: {
    MyArticles,
    MyFavorited
  },
  data() {
    return {
      activeName: 'first'
    };
  },
  async asyncData() {
    let userInfo = {};
    const {
      data: { user },
    } = await getUser();
    const { email = "", username = "", password = "", image = "", bio = "" } = user;
    userInfo = { email, username, password, image, bio };
    return {
      userInfo,
    };
  },
  methods: {
    toGithub() {
      window.open('https://github.com/13799433448/realworld-nuxt', '_blank');
    }
  }
}
</script>

<style>

</style>
