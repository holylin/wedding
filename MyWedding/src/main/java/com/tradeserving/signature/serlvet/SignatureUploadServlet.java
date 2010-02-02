/**
 * 
 */
package com.tradeserving.signature.serlvet;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

/**
 * @author liming
 * 
 */
public final class SignatureUploadServlet extends HttpServlet {

	private static final String DIR_NAME = "/signin/";

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		super.doGet(req, resp);
		this.processRequest(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		super.doPost(req, resp);
		this.processRequest(req, resp);
	}

	/*********
	 * upload the image
	 * 
	 * @param req
	 * @param resp
	 * @throws ServletException
	 * @throws IOException
	 */
	protected void processRequest(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		final int RESULT_SUCCESS = 1;
		final int RESULT_FAILED = 0;

		int result = RESULT_FAILED;

		DiskFileItemFactory factory = new DiskFileItemFactory();
		factory.setSizeThreshold(4096);
		ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setSizeMax(10000000);
		try {
			int index = 0;
			List<FileItem> fileItems = upload.parseRequest(request);
			Map<String, String> paramsMap = new HashMap<String, String>();
			if (fileItems != null && fileItems.size() > 0) {
				for (FileItem item : fileItems) {
					if (item.isFormField()) {
						paramsMap.put(item.getName(), item.getFieldName());
						System.out.println(item.getName() + "-"
								+ item.getFieldName());
					} else {
						try {

							item.write(new File(request.getSession()
									.getServletContext().getRealPath("")
									+ DIR_NAME
									+ System.currentTimeMillis()
									+ "_" + (++index) + ".jpg"));
							result = RESULT_SUCCESS;
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
			}
		} catch (FileUploadException e) {
			e.printStackTrace();
		}

		// response.setContentType("text/html;charset=UTF-8");
		// BufferedWriter bw = response.getOutputStream();
		PrintWriter out = response.getWriter();
		out.print(result);
		out.flush();
		out.close();
	}

}
