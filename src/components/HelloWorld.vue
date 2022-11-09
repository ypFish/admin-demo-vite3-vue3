<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">数量 {{ count }}</button>
    <p>{{ userName }}</p>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(50)

const userName = ref('')

/**
 * @description: 定义获取用户数据接口
 * @return {*}
 */
interface GetUser {
  (): void
}
/**
 * @description: 获取用户数据
 * @return {*}
 */
const getUser: GetUser = async () => {
  const res = await fetch('/api/user')
  interface UserData {
    data: {
      user: {
        name: string
        age: number
      }
    }
  }
  const userData: UserData = await res.json()
  console.log('用户数据', userData)
  userName.value = userData?.data?.user?.name || ''
}

onMounted(() => {
  getUser()
})
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
