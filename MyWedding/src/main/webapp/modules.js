// Module ID & link definitions
// Format:
// moduleId:{l:"url_of_this_module",
// t:"title_for_this_module",
// c:"optional color definition for title bar"}
var _modules = {
	m101 : {
		l : "m101.html",
		t : "",
		c : "red"
	},
	m102 : {
		l : "m102.html",
		t : "嘉宾签到",
		c : "yellow"
	},
	m103 : {
		l : "m103.html",
		t : "",
		c : "green"
	},

	m201 : {
		l : "m201.html",
		t : "抽取三等奖",
		c : "red"
	},
	m202 : {
		l : "m202.html",
		t : "抽取二等奖",
		c : "yellow"
	},
	m203 : {
		l : "m203.html",
		t : "抽取一等奖",
		c : "green"
	},

	m301 : {
		l : "m301.html",
		t : "婚纱照DVD"
	},
	m302 : {
		l : "m302.html",
		t : "婚纱照"
	},
	m303 : {
		l : "m303.html",
		t : "仙游订婚照",
		c : "green"
	},
	m304 : {
		l : "m304.html",
		t : "仙游结婚照"
	},
	m305 : {
		l : "m305.html",
		t : "诸暨结婚照"
	},
	m306 : {
		l : "m306.html",
		t : "杭州结婚照"
	},

	m400 : {
		l : "m400.html",
		t : "中文经典"
	},
	m401 : {
		l : "m401.html",
		t : "英文经典"
	},
	m402 : {
		l : "m402.html",
		t : ""
	},

	m500 : {
		l : "m500.html",
		t : "Some Goodies (m500)"
	},
	m501 : {
		l : "m501.html",
		t : "Local Link (m501)"
	},
	m502 : {
		l : "m502.html",
		t : "Ajax Forms (m502)"
	},
	m503 : {
		l : "m503.html",
		t : "Tab Link (m503)"
	},
	m504 : {
		l : "m504.html",
		t : "Thick Box (m504)"
	},

	m700 : {
		l : "m700.html",
		t : "RSSLi Menu (m700)"
	},
	m701 : {
		l : "m701.html",
		t : "RSS Reader (m701)"
	},
	m702 : {
		l : "rss.php?q=http%3A%2F%2Frss.msnbc.msn.com%2Fid%2F3032091%2Fdevice%2Frss%2Frss.xml",
		t : "MSNBC - Static RSS Module (m702)"
	},

	m601 : {
		l : "m601.html",
		t : "Resources & Credit"
	},
	m602 : {
		l : "m602.html",
		t : "License"
	}
};

// Layout definitions for each tab, aka, which modules go to which columns under
// which tab
// Format:
// {i:"id_of_the_module (refer to _modules)",
// c:"column_it_belongs_to (c1, c2, c3)"
// t:"tab_it_belongs_to (t1, t2, ...)"}
var _layout = [{
			i : 'm101',
			c : 'c1',
			t : 't1'
		}, {
			i : 'm102',
			c : 'c2',
			t : 't1'
		}, {
			i : 'm103',
			c : 'c3',
			t : 't1'
		},

		{
			i : 'm201',
			c : 'c1',
			t : 't2'
		}, {
			i : 'm202',
			c : 'c2',
			t : 't2'
		}, {
			i : 'm203',
			c : 'c3',
			t : 't2'
		},

		{
			i : 'm301',
			c : 'c1',
			t : 't3'
		}, {
			i : 'm302',
			c : 'c2',
			t : 't3'
		}, {
			i : 'm303',
			c : 'c3',
			t : 't3'
		},
		
		{
			i : 'm304',
			c : 'c1',
			t : 't3'
		}, {
			i : 'm305',
			c : 'c2',
			t : 't3'
		}, {
			i : 'm306',
			c : 'c3',
			t : 't3'
		},

		{
			i : 'm400',
			c : 'c1',
			t : 't4'
		}, {
			i : 'm401',
			c : 'c2',
			t : 't4'
		},

		{
			i : 'm500',
			c : 'c1',
			t : 't5'
		}, {
			i : 'm501',
			c : 'c2',
			t : 't5'
		},

		{
			i : 'm700',
			c : 'c1',
			t : 't7'
		}, {
			i : 'm701',
			c : 'c2',
			t : 't7'
		}, {
			i : 'm702',
			c : 'c2',
			t : 't7'
		},

		{
			i : 'm601',
			c : 'c1',
			t : 't6'
		}, {
			i : 'm602',
			c : 'c1',
			t : 't6'
		}];

// Column width definitions for each tab
// Valid values are pixel, % or auto
// Currently, "auto" is only valid on column2
// You can support more features by refining function HeaderTabClick()
var _tabs = {
	t1 : {
		c1 : "30%",
		c2 : "40%",
		c3 : "30%",
		helper : true
	},
	t2 : {
		c1 : "33.3%",
		c2 : "33.3%",
		c3 : "33.3%",
		helper : true
	},
	t3 : {
		c1 : "33.3%",
		c2 : "33.3%",
		c3 : "33.3%",
		helper : true
	},
	t4 : {
		c1 : "50%",
		c2 : "auto",
		c3 : 0,
		helper : true
	},
	t5 : {
		c1 : "270px",
		c2 : "auto",
		c3 : 0,
		helper : true
	},
	t6 : {
		c1 : "100%",
		c2 : 0,
		c3 : 0
	},
	t7 : {
		c1 : "270px",
		c2 : "auto",
		c3 : 0
	}
};