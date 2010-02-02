/*
 * Copyright 2006-2009 Hangzhou Quanshun Technology Co.,Ltd.
 *
 * All right reserved.
 */
package com.tradeserving.mywedding.guest.service.impl;

import com.tradeserving.core.json.JsonlibUtil;
import com.tradeserving.core.json.MakeJsonForPage;
import com.tradeserving.core.service.impl.GenericManagerImpl;
import com.tradeserving.mywedding.guest.dao.GuestDao;
import com.tradeserving.mywedding.guest.model.Guest;
import com.tradeserving.mywedding.guest.service.GuestManager;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import net.sf.json.JSONObject;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author HOLYLIN
 * @since 2009-12-22
 * @version 1.0
 */
@Service
@Transactional
public class GuestManagerImpl extends GenericManagerImpl<Guest, Long> implements
		GuestManager {

	@Autowired
	private JsonlibUtil jsonlibUtil;

	@Autowired
	private GuestDao guestDao;

	/**
	 * 返回分页的json数据。
	 * 
	 * @author HOLYLIN
	 * @since 2009-12-22
	 */
	@Override
	public void writeJsonOfModelForPage(PrintWriter out, int pageNo,
			int pageSize, HttpServletRequest request) {
		String hql = "from Guest ";
		MakeJsonForPage page = guestDao.pagedQuery(hql, pageNo, pageSize);
		out.write(jsonlibUtil.getJsonForPage(page, false));
	}

	/**
	 * 保存或更新。
	 * 
	 * @author HOLYLIN
	 * @since 2009-12-22
	 */
	@Override
	public void saveOrUpdateModelByJsonData(String jsonData) {
		Guest guest = null;
		JSONObject jsonObject = null;
		Iterator<JSONObject> it = jsonlibUtil.getIteratorFromJsonArr(jsonData);
		while (it.hasNext()) {
			jsonObject = it.next();
			guest = (Guest) jsonlibUtil.getJsonObject2Bean(jsonObject,
					Guest.class);
			guestDao.save(guest);
		}

	}

	/**
	 * 删除。
	 * 
	 * @author HOLYLIN
	 * @since 2009-12-22
	 */
	@Override
	public void deleteByIds(String[] ids) {
		for (String id : ids) {
			if (StringUtils.isNotBlank(id))
				guestDao.remove(new Long(id));
		}

	}

	@Override
	public List<Guest> listAvailableForLottery() {
		return guestDao.listAvailableForLottery();

	}

	@Override
	public void markWhoWin(String id) {
		Guest guest = guestDao.get(new Long(id));
		guest.setIsWinner("Y");
		guestDao.save(guest);

	}

}
