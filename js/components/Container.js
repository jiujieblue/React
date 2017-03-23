require('../../css/bootstrap.css');
require('../../css/icons.css');
require('../../less/C.less');

var React = require('react');
var Header = require('./Header.js');
var SimpleHeader = require('./SimpleHeader.js');
var Footer = require('./Footer.js');
var SimpleFooter = require('./SimpleFooter.js');
var PayHeader = require('./PayHeader.js');
var PayFooter = require('./PayFooter.js');
var SellerHeader = require('./SellerHeader.js');
var BuyerHeader = require('./BuyerHeader.js');
var HelpHeader = require('./HelpHeader.js');
var DaifaHeader = require('./DaifaHeader.js');

var qs = require('qs');

var Container = React.createClass({
	getDefaultProps: function() {
		return {
			simple: 0,
			title: '',
			useTop: true,
			useContainer: true
		};
	},

	render: function () {
		var loc = {};
		if (window.location.search) {
			loc.query = qs.parse(window.location.search.slice(1));
		}

		var childrenWithProps = React.Children.map(this.props.children, function(c) {
			return React.cloneElement(c, {
				location: loc
			});
		});

		return (
			<div className="ck-container">
				{ this.props.simple == 0 ? <Header showCategory={this.props.showCategory}/> : 
				this.props.simple == 1 ? <SimpleHeader title={this.props.title} useTop={this.props.useTop}/> : 
				this.props.simple == 'PayHeader' ? <PayHeader/> : 
				this.props.simple == 'SellerHeader' ? <SellerHeader /> :
				this.props.simple == 'BuyerHeader' ? <BuyerHeader /> : 
				this.props.simple == 'DaifaHeader' ? <DaifaHeader /> : 
				this.props.simple == 'HelpHeader' ? <HelpHeader /> : ''
				}

				<div className={this.props.useContainer ? 'container' : ''}>
				{ childrenWithProps }
				</div>

				{ this.props.simple == 0 ? <Footer /> : 
					this.props.simple == 1 ? <SimpleFooter /> : <PayFooter/> }
			</div>
			);
	}
});

module.exports = Container;