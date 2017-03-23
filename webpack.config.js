/*
config file for webpack dev server
*/
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {


		//shoppingAll: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/ShoppingAll.js'],
		// shoppingUp: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/ShoppingUp.js'],
		// sellerSide: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/SellerSide.js'],
		// sellerIndex: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/SellerIndex.js'],
		// userCenter: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/UserCenter.js'],
		walletWithdrawalRecord: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/WalletWithdrawalRecord.js'],
		walletWithdrawalDetails: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/WalletWithdrawalDetails.js'],
		walletBalance: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/WalletBalance.js'],
		// userFootprint: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/UserFootprint.js'],
		// managementBankCard: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/ManagementBankCard.js'],
		// walletWithdrawal: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/WalletWithdrawal.js'],
		// buyerSide: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/BuyerSide.js'],
		// buyerHeader: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/BuyerHeader.js'],	
		// cart: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/Cart.js'],
		// detail: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/Detail.js'],
		// buyerAddr: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/BuyerAddr.js'],
		buyerAccount: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/BuyerAccount.js'],
		// buyerColle: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/BuyerColle.js'],
		// buyerFocus: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/BuyerFocus.js'],
		// sellerAssetView: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/SellerAssetView.js'],
		// sellerDealDetail: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/SellerDealDetail.js'],

		sellerWithdrawal: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/SellerWithdrawal.js'],
		error: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/Error.js'],



		
		daifaHeader: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/DaifaHeader.js'],
		daifaWithdrawal: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/DaifaWithdrawal.js'],
		daifaWithdrawalRecord: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/DaifaWithdrawalRecord.js'],
		daifaWithdrawalResults: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/DaifaWithdrawalResults.js'],
		// helpSide: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/HelpSide.js']
		// sellerBank: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/SellerBank.js'],
		// sellerMember: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/SellerMember.js'],
		// sellerPublic: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/SellerPublic.js'],
		// sellerPublicDetail: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/SellerPublicDetail.js'],
		// daifaBalance: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/DaifaBalance.js'],
		// daifaBank: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/DaifaBank.js'],
		// daifaDealDetail: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/DaifaDealDetail.js'],
		// daifaSide: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/DaifaSide.js'],
		// helpCertification: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/HelpCertification.js'],
		buyerOpinion: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/BuyerOpinion.js'],
		// payment: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/Payment.js'],
		// sellerIndex: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/SellerIndex.js'],
		// myFav: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/MyFav.js']


		// userFootprint: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/UserFootprint.js'],
		// managementBankCard: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/ManagementBankCard.js'],
		// walletWithdrawal: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/WalletWithdrawal.js'],
		// walletWithdrawalRecord: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/WalletWithdrawalRecord.js'],
		// walletWithdrawalDetails: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/WalletWithdrawalDetails.js'],
		// walletBalance: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/WalletBalance.js'],
		// sellerWithdrawal: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/SellerWithdrawal.js'],	
		// page: ['webpack-dev-server/client?http://localhost:3333','webpack/hot/dev-server', './js/roots/Page.js'],
		// signUp: ['webpack-dev-server/client?http://localhost:3333','webpack/hot/dev-server', './js/roots/SignUp.js'],
		// signIn: ['webpack-dev-server/client?http://localhost:3333','webpack/hot/dev-server', './js/roots/SignIn.js'],
		// signUpSeller: ['webpack-dev-server/client?http://localhost:3333','webpack/hot/dev-server', './js/roots/SignUpSeller.js'],
		// resetPswd: ['webpack-dev-server/client?http://localhost:3333','webpack/hot/dev-server', './js/roots/ResetPswd.js'],
		// search: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/Search.js'],	
		// visitingMarket: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/VisitingMarket.js'],
		// hotsalepage:['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/HotSalePage.js'],
		// orderconfirm:['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/OrderConfirm.js'],
		// accountsecuritylv:['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/AccountSecurityLv.js'],

		// mobilephonebind:['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/MobilePhoneBind.js'],
		//marketInfo: ['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/MarketInfo.js']
		// editsigninpwd:['webpack-dev-server/client?http://localhost:3335','webpack/hot/dev-server', './js/roots/EditSignInPwd.js']



	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name].js',
		publicPath: '/build/'
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: ExtractTextPlugin.extract('style-loader', 'css-loader', {
				publicPath: './'
			})
		}, {
			test: /\.less$/,
			loader: 'style-loader!css-loader!less-loader'
		}, {
			test: /\.(ttf|eot|svg|woff(2)?)(\?v=[\d.]+)?(\?[a-z0-9#-]+)?$/,
			loader: 'file-loader'
		}, {
			test: /\.(png|jpg|gif)$/,
			loader: 'url-loader?limit=8192'
		}, {
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel',
			query: {
				presets: ['react', 'es2015']
			}
		}]
	},
	plugins: [
		new ExtractTextPlugin('[name].css'),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		}),
		new webpack.DefinePlugin({
			'require.specified': 'require.resolve'
		})
	]
};