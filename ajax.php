<?php
        $filearray = array();
        $imgtitlearray = array();
		$dimensionsarray = array();

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

//        echo json_encode($filearray);
        echo json_encode(array('imgpath'=>$filearray,'imgtitle'=>$imgtitle,'dimensions'=>$dimensionsarray,'thumbarray'=>$thumbarray));

?>