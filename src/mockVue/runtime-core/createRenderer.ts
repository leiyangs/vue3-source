export function createRenderer(options: object) {
  return {
    createApp(rootComponent: any) {
      const app = {
        mount(container: any) {},
      };
      return app;
    },
  };
}
