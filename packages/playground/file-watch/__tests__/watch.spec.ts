import {
  editFile,
  getBg,
  getColor,
  isBuild,
  removeFile,
  untilUpdated
} from 'testUtils'

test('should render', async () => {
  expect(await page.textContent('.test')).toMatch('foo')
})

if (!isBuild) {
  test('edit file', async () => {
    editFile('Test.vue', (code) =>
      code.replace("const foo = ref('foo')", "const foo = ref('bar')")
    )
    await untilUpdated(() => page.textContent('.test'), 'bar')
    editFile('Test.vue', () => '')
    await untilUpdated(() => page.textContent('.test'), '')
  })

  test('file add and unlink', async () => {
    removeFile('Test.vue')
    await untilUpdated(() => page.textContent('.test'), '')
    expect(await page.$('vite-error-overlay')).not.toBeNull()
  })
}
