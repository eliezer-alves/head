import path from 'path'

export default {
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@user': path.resolve(__dirname, 'src/modules/user'),
      '@': path.resolve(__dirname, 'src'),
      '@tests': path.resolve(__dirname, 'tests'),
    },
  },
}
