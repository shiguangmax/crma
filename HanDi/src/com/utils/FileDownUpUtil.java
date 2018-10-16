package com.utils;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

/**
 * 上传下载
 * @author caoxu
 *
 */
public class FileDownUpUtil {
	
	private static final Logger logger = LoggerFactory.getLogger(FileDownUpUtil.class);

	/**
	 * 创建文件夹
	 * @param floderPath
	 */
	public static void mkDir(String floderPath) {
		File file = new File(floderPath);
		// 如果文件夹不存在则创建
		if (!file.exists() && !file.isDirectory()) {
			file.mkdirs();
		}
	}

	/**
	 * 文件拷贝
	 * @param sourcePath
	 * @param targetPath
	 */
	public static void fileCopy(String sourcePath, String targetPath) {
		try {
			FileCopyUtils.copy(new FileInputStream(sourcePath), new FileOutputStream(targetPath));
		} catch (Exception e) {
			logger.info("文件拷贝出错");
		}
	}

	/**
	 * 本地上传
	 * @param files
	 * @param fileName
	 * @param fileLocPath
	 * @return
	 */
	public static String uploadToLoc(MultipartFile files, String fileName, String fileLocPath) {
		//System.out.println("上传到本地开始");
		File targetFile = new File(fileLocPath, fileName);
		if (!targetFile.exists()) {
			targetFile.mkdirs();
		}
		// 保存
		try {
			files.transferTo(targetFile);
			//System.out.println("上传到本地结束");
			return fileName;
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}

	/**
	 * 从本地下载
	 * @param fileName 文件名
	 * @param request
	 * @param filePath 路径
	 * @return
	 */
	public static ResponseEntity<byte[]> downFromLoc(String fileName, HttpServletRequest request, String filePath) {
		byte[] buffer = null;
		HttpHeaders headers = new HttpHeaders();
		try {
			File file = new File(filePath + File.separator + fileName);
			FileInputStream fis = new FileInputStream(file);
			byte[] b = new byte[1024];
			ByteArrayOutputStream bos = new ByteArrayOutputStream(1024);
			int n;
			while ((n = fis.read(b)) != -1) {
				bos.write(b, 0, n);
			}
			fis.close();
			bos.close();
			buffer = bos.toByteArray();
			// 处理响应
			int index = fileName.indexOf("-");
			fileName = fileName.substring(index + 1);
			if (request.getHeader("User-Agent").contains("MSIE")
					|| request.getHeader("User-Agent").contains("Trident")) {
				fileName = java.net.URLEncoder.encode(fileName, "UTF-8").replaceAll("\\+", "%20");
			} else {
				// 非IE浏览器的处理
				fileName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");
			}
			headers.setContentDispositionFormData("attachment", fileName);
			headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
			return new ResponseEntity<byte[]>(buffer, headers, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
