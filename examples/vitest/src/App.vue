<script lang="ts" setup>
import { onMounted, ref } from '@vue/runtime-core'
import { TBox } from '@temir/core'
import P from '@antfu/p'
import delay from 'delay'
import ms from 'ms'
import Test from './Test.vue'
import Summary from './Summary.vue'

const paths = [
  'tests/hi-temir.ts',
  'tests/temir-link.ts',
  'tests/temir-spinner.ts',
  'tests/temir-tab.ts',
  'tests/table.ts',
  'tests/borders.ts',
  'tests/cli.ts',
  'tests/create-renderer.ts',
  'tests/hello-world.js',
  'tests/awesome-temir.ts',
]
const startTime = ref(Date.now())
const completedTests = ref<{ status: string;path: string }[]>([])
const runningTests = ref<{ status: string;path: string }[]>([])

async function runTest(path: string) {
  runningTests.value = [...runningTests.value, {
    status: 'runs',
    path,
  }]
  await delay(1000 * Math.random())
  runningTests.value = runningTests.value.filter(({ path: p }) => p !== path)
  completedTests.value = [...completedTests.value, {
    status: Math.random() < 0.5 ? 'fail' : 'pass',
    path,
  }]
}

onMounted(async () => {
  const p = P([], { concurrency: 4 })
  paths.forEach((path) => {
    p.add(new Promise((resolve) => {
      runTest(path).then(() => {
        resolve('')
      })
    }),
    )
  })

  await p
})
</script>

<template>
  <TBox flex-direction="column">
    <TBox flex-direction="column">
      <Test v-for="(item, index) in completedTests" :key="index" :status="item.status" :path="item.path" />
    </TBox>
    <TBox flex-direction="column">
      <Test v-for="(item, index) in runningTests" :key="index" :status="item.status" :path="item.path" />
    </TBox>
    <Summary
      :passed="completedTests.filter((item) => item?.status === 'pass').length"
      :failed="completedTests.filter((item) => item?.status === 'fail').length"
      :duration="ms(Date.now() - startTime)"
    />
  </TBox>
</template>
