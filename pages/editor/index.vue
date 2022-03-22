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
              <el-select v-model="article.tagList" multiple  collapse-tags placeholder="please choose" style="width:100%">
                <el-option v-for="(item, index) in tags" :key="index" :label="item" :value="item">
                </el-option>
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
import { createArticle } from "@/api/article";
import { getTags } from "@/api/tag";
export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: "authenticated",
  name: "EditorIndex",
  async asyncData() {
    const { data: { tags } } = await getTags();
    return {
      tags // 标签列表
    };
  },
  data() {
    return {
      tags: [],
      article: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
      rules: {
        title: [{ required: true, trigger: "change" }],
        body: [{ required: true, trigger: "change" }],
      },
    };
  },
  methods: {
    async submitForm() {
      const valid = await this.$refs.ruleForm.validate().catch((err) => err);
      if (valid) {
        const {
          data: { article },
        } = await createArticle({
          article: this.article,
        });
        if (article && article.author) {
          this.$message.success("Article published successfully");
          this.$refs.ruleForm.resetFields();
          this.$router.push("/");
        }
      }
    },
  },
};
</script>

<style></style>
