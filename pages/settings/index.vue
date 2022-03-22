<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <ul class="error-messages">
            <template v-for="(messages, field) in errors"> {{ field }}： {{ messages }} </template>
          </ul>
          <el-form :model="userInfo" :rules="rules" ref="ruleForm" label-width="160px">
            <el-form-item label="URL of profile picture" prop="name">
              <el-input v-model="userInfo.image" placeholder="URL of profile picture"></el-input>
            </el-form-item>
            <el-form-item label="Username" prop="username">
              <el-input v-model="userInfo.username" placeholder="Username"></el-input>
            </el-form-item>
            <el-form-item label="Short bio about you" prop="bio">
              <el-input type="textarea" v-model="userInfo.bio" placeholder="Short bio about you"></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input type="textarea" v-model="userInfo.email" placeholder="Email"></el-input>
            </el-form-item>
            <el-form-item label="New Password" prop="password">
              <el-input placeholder="New Password" v-model="userInfo.password" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="submitForm">Update Setting</el-button>
              <el-button type="danger" @click="signOut">Sign Out</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, updatetUser } from "@/api/user";
import { mapMutations } from "vuex";
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  middleware: "authenticated",
  name: "SettingsIndex",
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
  data() {
    return {
      rules: {
        email: [{ required: true, trigger: "change" }],
        password: [{ required: true, trigger: "change" }],
        username: [{ required: true, trigger: "change" }],
      },
      errors: {}, // 错误信息
    };
  },
  methods: {
    ...mapMutations(["setUser"]),
    async submitForm() {
      const valid = await this.$refs.ruleForm.validate().catch((err) => err);
      if (valid) {
        try {
          const { data } = await updatetUser({
            user: this.userInfo,
          });
          this.setUser(data.user);
          Cookie.set("user", JSON.stringify(data.user), {
            expires: 7,
          });
          this.$router.push("/");
        } catch (err) {
          // console.log(err)
          this.errors = err.response.data.errors;
        }
      }
    },
    signOut() {
      Cookie.remove("user");
      this.$router.push("/");
      this.setUser(null);
    },
  },
};
</script>

<style></style>
