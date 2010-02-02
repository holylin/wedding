/*
 * Copyright 2006-2009 Hangzhou Quanshun Technology Co.,Ltd.
 *
 * All right reserved.
 */
package com.tradeserving.mywedding.guest.dao;

import java.util.List;

import com.tradeserving.core.json.dao.GenericDao;
import com.tradeserving.mywedding.guest.model.Guest;

/**
 * @author HOLYLIN
 * @since 2009-12-22
 * @version 1.0
 */
public interface GuestDao extends GenericDao<Guest, Long> {

	List<Guest> listAvailableForLottery();

}
