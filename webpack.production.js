var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		accountSecurityLv: './js/roots/AccountSecurityLv.js',
		buyerAccount: './js/roots/BuyerAccount.js',
		buyerAddr: './js/roots/BuyerAddr.js',
		buyerColle: './js/roots/BuyerColle.js',
		buyerFocus: './js/roots/BuyerFocus.js',
		buyerHeader: './js/roots/BuyerHeader.js',
		buyerOpinion: './js/roots/BuyerOpinion.js',
		buyerSide: './js/roots/BuyerSide.js',
		cart: './js/roots/Cart.js',
		daifaBalance: './js/roots/DaifaBalance.js',
		daifaBank: './js/roots/DaifaBank.js',
		daifaDealDetail: './js/roots/DaifaDealDetail.js',
		daifaHeader: './js/roots/DaifaHeader.js',
		daifaSide: './js/roots/DaifaSide.js',
		daifaWithdrawal: './js/roots/DaifaWithdrawal.js',
		daifaWithdrawalRecord: './js/roots/DaifaWithdrawalRecord.js',
		daifaWithdrawalResults: './js/roots/DaifaWithdrawalResults.js',
		detail: './js/roots/Detail.js',
		editSignInPwd: './js/roots/EditSignInPwd.js',
		error: './js/roots/Error.js',
		helpCertification: './js/roots/HelpCertification.js',
		helpHeader: './js/roots/HelpHeader.js',
		helpSide: './js/roots/HelpSide.js',
		hotSalePage: './js/roots/HotSalePage.js',
		index: './js/roots/Index.js',
		managementBankCard: './js/roots/ManagementBankCard.js',
		marketInfo: './js/roots/MarketInfo.js',
		mobilePhoneBind: './js/roots/MobilePhoneBind.js',
		myFav: './js/roots/MyFav.js',
		orderConfirm: './js/roots/OrderConfirm.js',
		page: './js/roots/Page.js',
		payFooter: './js/roots/PayFooter.js',
		payHeader: './js/roots/PayHeader.js',
		payment: './js/roots/Payment.js',
		paysuccess: './js/roots/Paysuccess.js',
		resetPswd: './js/roots/ResetPswd.js',
		search: './js/roots/Search.js',
		sellerAssetView: './js/roots/SellerAssetView.js',
		sellerBank: './js/roots/SellerBank.js',
		sellerDealDetail: './js/roots/SellerDealDetail.js',
		sellerHeader: './js/roots/SellerHeader.js',
		sellerIndex: './js/roots/SellerIndex.js',
		sellerMember: './js/roots/SellerMember.js',
		sellerPublic: './js/roots/SellerPublic.js',
		sellerPublicDetail: './js/roots/SellerPublicDetail.js',
		sellerSide: './js/roots/SellerSide.js',
		sellerWithdrawal: './js/roots/SellerWithdrawal.js',
		shoppingAll: './js/roots/ShoppingAll.js',
		shoppingUp: './js/roots/ShoppingUp.js',
		signIn: './js/roots/SignIn.js',
		signUp: './js/roots/SignUp.js',
		signUpSeller: './js/roots/SignUpSeller.js',
		userCenter: './js/roots/UserCenter.js',
		userFootprint: './js/roots/UserFootprint.js',
		visitingMarket: './js/roots/VisitingMarket.js',
		walletBalance: './js/roots/WalletBalance.js',
		walletWithdrawal: './js/roots/WalletWithdrawal.js',
		walletWithdrawalDetails: './js/roots/WalletWithdrawalDetails.js',
		walletWithdrawalRecord: './js/roots/WalletWithdrawalRecord.js'
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
		new webpack.optimize.UglifyJsPlugin(),
		new ExtractTextPlugin('[name].css'),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
};
