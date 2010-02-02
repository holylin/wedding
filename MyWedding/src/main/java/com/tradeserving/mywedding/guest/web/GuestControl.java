/*
 * Copyright 2006-2009 Hangzhou Quanshun Technology Co.,Ltd.
 *
 * All right reserved.
 */
package com.tradeserving.mywedding.guest.web;

import com.tradeserving.core.json.JsonlibUtil;
import com.tradeserving.core.service.ServiceException;
import com.tradeserving.core.util.ParamUtil;
import com.tradeserving.mywedding.guest.model.Guest;
import com.tradeserving.mywedding.guest.service.GuestManager;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.File;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author HOLYLIN
 * @since 2009-12-22
 * @version 1.0
 */
@Controller
@RequestMapping("/guest.do")
public class GuestControl {
	protected final Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private GuestManager guestManager;

	/**
	 * 返回分页的json数据。
	 * 
	 * @author HOLYLIN
	 * @since 2009-12-22
	 */
	@RequestMapping(params = "method=list")
	public String list(HttpServletRequest request, HttpServletResponse response) {
		try {
			int pageSize = ParamUtil.getInt(request, "limit");
			int start = ParamUtil.getInt(request, "start");
			start = start / pageSize;
			guestManager.writeJsonOfModelForPage(response.getWriter(), start,
					pageSize, request);

		} catch (ServiceException e) {

			logger.error(e.getMessage(), e);
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
		}
		return null;
	}

	/**
	 * 保存或更新。
	 * 
	 * @author HOLYLIN
	 * @since 2009-12-22
	 */
	@RequestMapping(params = "method=saveOrUpdate")
	public String saveOrUpdate(HttpServletRequest request,
			HttpServletResponse response) {
		try {
			String jsonData = ParamUtil.getString(request, "data");
			jsonData = JsonlibUtil.preHandle(jsonData);
			guestManager.saveOrUpdateModelByJsonData(jsonData);
			response.getWriter().print("{success:true}");
		} catch (ServiceException e) {

			logger.error(e.getMessage(), e);
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
		}
		return null;
	}

	/**
	 * 删除。
	 * 
	 * @author HOLYLIN
	 * @since 2009-12-22
	 */
	@RequestMapping(params = "method=delete")
	public String delete(HttpServletRequest request,
			HttpServletResponse response) {
		try {
			String ids = ParamUtil.getString(request, "ids");
			guestManager.deleteByIds(ids.split(","));
			response.getWriter().print("{success:true}");
		} catch (ServiceException e) {

			logger.error(e.getMessage(), e);
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
		}
		return null;
	}

	/**
	 * 有图片签到者抽奖。
	 * 
	 * @author HOLYLIN
	 * @since 2009-12-22
	 */
	@RequestMapping(params = "method=lotteryForSignin")
	public String lotteryForSignin(HttpServletRequest request,
			HttpServletResponse response, ModelMap map) {
		try {
			String signInDirStr = request.getSession().getServletContext()
					.getRealPath("/signin");
			Set<String> set = new HashSet<String>();
			if (signInDirStr != null) {
				File signInDir = new File(signInDirStr);
				for (String path : signInDir.list()) {
					if (path.indexOf("jpg") != -1 || path.indexOf("png") != -1
							|| path.indexOf("gif") != -1)
						set.add(path);
				}
				map.addAttribute("signInFilePaths", set);
			}
		} catch (ServiceException e) {

			logger.error(e.getMessage(), e);
		}
		return "lotteryForSignin.jsp";
	}

	/**
	 * 有名字的签到者抽奖。
	 * 
	 * @author HOLYLIN
	 * @since 2009-12-22
	 */
	@RequestMapping(params = "method=lotteryForName")
	public String lotteryForName(HttpServletRequest request,
			HttpServletResponse response, String lotteryFileName, ModelMap model) {
		try {

			List<Guest> guestsAvailableForLottery = guestManager
					.listAvailableForLottery();
			model.addAttribute("guestsAvailableForLottery",
					guestsAvailableForLottery);

		} catch (ServiceException e) {

			logger.error(e.getMessage(), e);
		}
		return lotteryFileName;
	}

	/**
	 * 标注中奖的嘉宾。
	 * 
	 * @author HOLYLIN
	 * @since 2009-12-22
	 */
	@RequestMapping(params = "method=markWhoWin")
	public String markWhoWin(HttpServletRequest request, String id,
			HttpServletResponse response, ModelMap model) {
		try {
			guestManager.markWhoWin(id);
		} catch (ServiceException e) {

			logger.error(e.getMessage(), e);
		}
		return null;
	}

	/**
	 * 随机选择一个符合条件的电话号码。
	 * 
	 * @author HOLYLIN
	 * @since 2009-12-25
	 */
	@RequestMapping(params = "method=returnRandomPhone")
	public String returnRandomPhone(HttpServletRequest request,
			HttpServletResponse response, ModelMap model) {
		try {

			List<Guest> guestsAvailableForLottery = guestManager
					.listAvailableForLottery();
			Math.random();
			response.getWriter().print("{success:true}");

		} catch (ServiceException e) {

			logger.error(e.getMessage(), e);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

}
