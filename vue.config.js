const path=require("path")
module.exports = {
	devServer: {
		port: 8080,
		// proxy: {
		//   "/api": {
		//     target: "http://localhost:3000/",
		//     secure: false, // 接受 运行在 https 上的服务
		//     changeOrigin: true, // 存在跨域
		//     pathRewrite: {
		//       "^/api": "" // 前端 /api/foo => 后端 /foo
		//     }
		//   }
		// }
	},
	configureWebpack: {
		resolve: {
			alias: {
				"~": path.join(__dirname, 'src/')
			}
		}
	}
};
