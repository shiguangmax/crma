package com.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

/**
 * http工具类
 * @author caoxu
 *
 */
public class HttpUtil {

	/**
	 * 发送POST请求
	 * @param url
	 * @param params
	 * @return
	 */
	public static String doPost(String url, Map<String, String> params) {
		CloseableHttpClient httpclient = HttpClients.createDefault();
		HttpPost httpPost = null;
		String result = null;
		CloseableHttpResponse response = null;
		try {
			httpPost = new HttpPost(url);
			// 设置参数
			Iterator<Map.Entry<String, String>> it = params.entrySet().iterator();

			List<NameValuePair> nvps = new ArrayList<NameValuePair>();
			while (it.hasNext()) {
				Map.Entry<String, String> entry = it.next();
				nvps.add(new BasicNameValuePair(entry.getKey().toString(), entry.getValue().toString()));
			}
			if (nvps.size() > 0) {
				UrlEncodedFormEntity entity = new UrlEncodedFormEntity(nvps, "UTF-8");
				httpPost.setEntity(entity);
			}
			response = httpclient.execute(httpPost);
			if (response != null) {
				HttpEntity resEntity = response.getEntity();
				if (resEntity != null) {
					result = EntityUtils.toString(resEntity, "UTF-8");
					EntityUtils.consume(resEntity);
				}
			}
		} catch (Exception ex) {
		} finally {
	        try {
	        	if (response != null) {
	        		response.close();
	        	}
			} catch (IOException e) {
			}
	    }
		return result;
	}
	
	/**
	 * 发送GET请求
	 * @param url
	 * @return
	 */
	public static String doGet(String url) {
		CloseableHttpClient httpclient = HttpClients.createDefault();
		HttpGet httpGet = null;
		String result = null;
		CloseableHttpResponse response = null;
		try {
			httpGet = new HttpGet(url);
			response = httpclient.execute(httpGet);
			if (response != null) {
				HttpEntity resEntity = response.getEntity();
				if (resEntity != null) {
					result = EntityUtils.toString(resEntity, "UTF-8");
					EntityUtils.consume(resEntity);
				}
			}
		} catch (Exception ex) {
		} finally {
			try {
				if (response != null) {
					response.close();
				}
			} catch (IOException e) {
			}
		}
		return result;
	}
	
	/**
     * 向指定URL发送GET方法的请求，适用于有特殊符号的
     * @param url 发送请求的URL
     * @param param 请求参数，请求参数应该是 name1=value1&name2=value2 的形式。
     * @return URL 所代表远程资源的响应结果
     */
	public static String sendGet(String url, String param) {
		String result = "";
		BufferedReader in = null;
		try {
			String urlNameString = url + "?" + param;
			URL realUrl = new URL(urlNameString);
			// 打开和URL之间的连接
			URLConnection connection = realUrl.openConnection();
			// 设置通用的请求属性
			connection.setRequestProperty("accept", "*/*");
			connection.setRequestProperty("connection", "Keep-Alive");
			connection.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
			// 建立实际的连接
			connection.connect();
			// 获取所有响应头字段
			Map<String, List<String>> map = connection.getHeaderFields();
			// 遍历所有的响应头字段
			for (String key : map.keySet()) {
				System.out.println(key + "--->" + map.get(key));
			}
			// 定义 BufferedReader输入流来读取URL的响应
			in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
			String line;
			while ((line = in.readLine()) != null) {
				result += line;
			}
		} catch (Exception e) {
			System.out.println("发送GET请求出现异常！" + e);
			e.printStackTrace();
		}
		// 使用finally块来关闭输入流
		finally {
			try {
				if (in != null) {
					in.close();
				}
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
		return result;
	}

}
