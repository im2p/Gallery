<?php
        $filearray = array();
        $imgtitlearray = array();
		$dimensionsarray = array();
		$folderarray = array();
		$foldernames = array();

        foreach (glob("img/port/*.jpg") as $file) {
            $filearray[] = $file;
			$dimensionsarray[] = getimagesize($file);
        }
        
        foreach (glob("img/port/*.jpg") as $imgtitle) {
            $imgtitlearray[] = basename($imgtitle);
            $imgtitle = preg_replace('/\\.[^.\\s]{3,4}$/', '', $imgtitlearray);
        }
		foreach (glob("img/port/thumbs/*.jpg") as $thumbpath) {
            $thumbarray[] = $thumbpath;
        }

		foreach (glob("img/*", GLOB_ONLYDIR) as $foldername) {
			$folderarray[] = $foldername;
		}
		foreach (glob("img/*", GLOB_ONLYDIR) as $fnames) {
            $foldernames[] = basename($fnames);
            $fnames = preg_replace('/\\.[^.\\s]{3,4}$/', '', $foldernames);
        }
//        echo json_encode($filearray);
        echo json_encode(array('imgpath'=>$filearray,
							   'imgtitle'=>$imgtitle,
							   'dimensions'=>$dimensionsarray,
							   'folderpath'=>$folderarray,
							   'foldername'=>$foldernames,
							   'thumbarray'=>$thumbarray));
?>