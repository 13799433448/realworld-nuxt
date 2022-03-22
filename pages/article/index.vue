<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <article-meta :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <mavon-editor v-model="article.body" :subfield="false" :toolbarsFlag="false" defaultOpen="preview" style="width:100%"/>
      </div>
      <hr />
      <ul class="tag-list" v-for="(subItem, subIndex) in article.tagList" :key="subIndex">
        <li class="tag-default tag-pill tag-outline">
          <nuxt-link
            :to="{
              name: 'home',
              query: {
                tab: 'tag',
                tag: item,
              },
            }"
            >{{ subItem }}</nuxt-link
          >
        </li>
      </ul>

      <div class="article-actions">
        <article-meta :article="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comments :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from "@/api/article";
import MarkdownIt from "markdown-it";
import ArticleMeta from "./components/article-meta";
import ArticleComments from "./components/article-comments";

export default {
  name: "ArticleIndex",
  async asyncData({ params }) {
    const { data } = await getArticle(params.slug);
    const { article } = data;
    // const md = new MarkdownIt()
    // article.body = md.render(article.body)
    return {
      article,
    };
  },
  components: {
    ArticleMeta,
    ArticleComments,
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [{ hid: "description", name: "description", content: this.article.description }],
    };
  },
};
</script>

<style></style>
