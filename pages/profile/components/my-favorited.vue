<template>
  <el-empty description="oh no it's empty" v-if="!comments.length"></el-empty>
  <div v-else>
    <div class="article-preview" v-for="(item, index) in comments" :key="index">
      <div class="article-meta">
        <a href=""><img :src="item.author.image" /></a>
        <div class="info">
          <a href="" class="author">{{ item.author.username }}</a>
          <span class="date">{{ item.createdAt | date('MMM DD, YYYY') }}</span>
        </div>
        <button class="btn btn-outline-primary btn-sm pull-xs-right"><i class="ion-heart"></i> {{ item.favoritesCount }}</button>
      </div>
      <nuxt-link
        class="preview-link"
        :to="{
          name: 'article',
          params: {
            slug: item.slug,
          },
        }"
      >
        <h1>{{ item.title }}</h1>
        <p>{{ item.description }}</p>
        <span>Read more...</span>
        <ul class="tag-list" v-for="(subItem, subIndex) in item.tagList" :key="subIndex">
          <li class="tag-default tag-pill tag-outline">{{ subItem }}</li>
        </ul>
      </nuxt-link>
    </div>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="20"
      layout="total, prev, pager, next"
      :total="articlesCount"
    >
    </el-pagination>
  </div>
</template>
<script>
import { getFavorited } from "@/api/article";
export default {
  name: "MyArticles",
  data() {
    return {
      comments: [], // 文章列表
      articlesCount: 0, // 文章总数
      currentPage: 1
    };
  },
  async mounted() {
    this.getFavorited()
  },
  methods: {
    async getFavorited() {
      const offset = (this.currentPage - 1) * 20
      const { data: { articles = [], articlesCount = -1 } } = await getFavorited(this.$route.params.username, offset);
      this.comments = articles
      this.articlesCount = articlesCount
    },
    handleCurrentChange() {
      this.getFavorited()
    }
  }
};
</script>
