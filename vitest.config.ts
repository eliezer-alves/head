import path from 'path'

export default {
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@auth': path.resolve(__dirname, 'src/modules/auth'),
      '@user': path.resolve(__dirname, 'src/modules/user'),
      '@': path.resolve(__dirname, 'src'),
      '@tests': path.resolve(__dirname, 'tests'),
    },
  },
}
