/*
 * Copyright 2006-2009 Hangzhou Quanshun Technology Co.,Ltd.
 *
 * All right reserved.
 */
package com.tradeserving.mywedding.guest.service;

import com.tradeserving.core.service.GenericManager;
import com.tradeserving.mywedding.guest.model.Guest;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

/**
 * @author HOLYLIN
 * @since 2009-12-22
 * @version 1.0
 */

public interface GuestManager extends GenericManager<Guest, Long> {

	void writeJsonOfModelForPage(PrintWriter out, int pageNo, int pageSize,
			HttpServletRequest request);

	void saveOrUpdateModelByJsonData(String jsonData);

	void deleteByIds(String[] ids);

	List<Guest> listAvailableForLottery();

	void markWhoWin(String id);

}
