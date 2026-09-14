export default {
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        mobile: 'mobile.html',
      },
    },
  },
};
