<?php
        $filearray = array();
        $imgtitlearray = array();
		$dimensionsarray = array();
		$folderarray = array();
		$foldernames = array();
		$currentfolderarray = array();
		$thumbarray = array();
		$x = 0;

		foreach (glob("img/*", GLOB_ONLYDIR) as $fnames) {
            $foldernames[] = basename($fnames);
        }


		foreach ($foldernames as $currentfolder) {
			foreach (glob("img/".$currentfolder."/*.jpg") as $file) {
				$filearray[$x][] = $file;
				$dimensionsarray[$x][] = getimagesize($file);
        	}
			
			foreach (glob("img/".$currentfolder."/*.jpg") as $imgtitle) {
				$imgtitlearray[$x][] = basename($imgtitle);
				$imgtitleNoExt[$x] = preg_replace('/\\.[^.\\s]{3,4}$/', '', $imgtitlearray[$x]);
			}

			foreach (glob("img/".$currentfolder."/thumbs/*.jpg") as $thumbpath) {
				$thumbarray[$x] = $thumbpath;
			}
			$x = $x + 1;
			
		}
			echo json_encode(array(
				'imgpath'=>$filearray,
				'imgtitle'=>$imgtitleNoExt,
				'folderpath'=>$folderarray,
				'foldername'=>$foldernames,
			    'thumbarray'=>$thumbarray,
				'dimensions'=>$dimensionsarray
			    
			));
        
?>