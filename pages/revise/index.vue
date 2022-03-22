<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <el-form :model="article" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="Title" prop="title">
              <el-input v-model="article.title"></el-input>
            </el-form-item>
            <el-form-item label="Description" prop="description">
              <el-input v-model="article.description"></el-input>
            </el-form-item>
            <el-form-item label="Body" prop="body">
              <mavon-editor v-model="article.body" />
            </el-form-item>
            <el-form-item label="Tags" prop="tagList">
              <el-select
                v-model="article.tagList"
                multiple
                collapse-tags
                placeholder="please choose"
                style="width: 100%"
              >
                <el-option v-for="(item, index) in tags" :key="index" :label="item" :value="item"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">Submit</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateArticle, getArticle } from "@/api/article";
import { getTags } from "@/api/tag";
import { mapState } from "vuex";
export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: "authenticated",
  name: "EditorIndex",
  async asyncData({ params }) {
    const slug = params.slug;
    const {
      data: { tags },
    } = await getTags();
    const { data: articlFetail } = await getArticle(slug);
    const { article } = articlFetail;
    return {
      slug,
      tags, // 标签列表
      article,
    };
  },
  data() {
    return {
      tags: [],
      rules: {
        title: [{ required: true, trigger: "change" }],
        body: [{ required: true, trigger: "change" }],
      },
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async submitForm() {
      const valid = await this.$refs.ruleForm.validate().catch((err) => err);
      if (valid) {
        const {
          data: { article },
        } = await updateArticle(this.slug, { article: this.article });
        if (article && article.author) {
          this.$message.success("Article Update successfully");
          this.$refs.ruleForm.resetFields();
          this.$router.push({
            name: "profile",
            params: {
              username: this.user.username,
            },
          });
        }
      }
    },
  },
};
</script>

<style></style>
