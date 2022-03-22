<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <!-- <a href="">Have an account?</a> -->
            <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors"> {{ field }}： {{ messages }} </template>
          </ul>
          <el-form :model="user" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="用户名" prop="username" v-if="!isLogin">
              <el-input v-model="user.username"></el-input>
            </el-form-item>
            <el-form-item label="登录邮箱" prop="email">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="user.password" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">{{ isLogin ? "Sign in" : "Sign up" }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user";
import { mapMutations } from "vuex";
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  middleware: "notAuthenticated",
  name: "LoginIndex",
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "change" }],
        email: [{ required: true, message: "请输入登录邮箱", trigger: "change" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, message: "长度在 8 个字符以上", trigger: "blur" },
        ],
      },
      errors: {}, // 错误信息
    };
  },

  methods: {
    ...mapMutations(["setUser"]),
    async onSubmit() {
      const valid = await this.$refs.ruleForm.validate().catch((err) => err);
      if (valid) {
        try {
          // 提交表单请求登录
          const { data } = this.isLogin
            ? await login({
                user: this.user,
              })
            : await register({
                user: this.user,
              });

          this.setUser(data.user);

          Cookie.set("user", JSON.stringify(data.user), {
            expires: 7,
          });

          // 跳转到首页
          this.$router.push("/");
        } catch (err) {
          // console.log('请求失败', err)
          this.errors = err.response.data.errors;
        }
      }
    },
  },
};
</script>

<style></style>
