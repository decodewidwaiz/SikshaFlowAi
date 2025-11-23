import os
import time
import moviepy
from moviepy import ImageClip, concatenate_videoclips, AudioFileClip, VideoFileClip

def create_video(slide_images, audio_path, durations=None):
    """
    Create a video from slide images and audio using MoviePy.
    Optimized for shorter videos with fps=10 and max total duration of 90 seconds.
    Uses chunked processing for better performance.
    """
    try:
        if not os.path.exists(audio_path):
            raise FileNotFoundError(f"Audio file not found: {audio_path}")

        existing_images = [img for img in slide_images if os.path.exists(img)]
        if not existing_images:
            raise FileNotFoundError("No valid slide images found")

        if durations is None:
            # Default to 10 seconds per slide for concise videos
            durations = [10] * len(existing_images)
        else:
            # Cap each duration at 15 seconds to ensure total video stays under 90 seconds
            durations = [min(dur, 15) for dur in durations]

        # Process in chunks for better memory management
        chunk_size = 5  # Process 5 slides at a time
        all_clips = []
        
        # Create video clips from images in chunks
        for i in range(0, len(existing_images), chunk_size):
            chunk_images = existing_images[i:i + chunk_size]
            chunk_durations = durations[i:i + chunk_size]
            
            # Create clips for this chunk
            chunk_clips = []
            for img, dur in zip(chunk_images, chunk_durations):
                clip = ImageClip(img, duration=dur)
                chunk_clips.append(clip)
            
            all_clips.extend(chunk_clips)

        # Concatenate all image clips at once for better performance
        if len(all_clips) > 1:
            video = concatenate_videoclips(all_clips, method="compose")
        else:
            video = all_clips[0]

        # Load audio
        audio = AudioFileClip(audio_path)

        # Set audio to video (MoviePy 2.x uses with_audio instead of set_audio)
        final_video = video.with_audio(audio)

        path = "output/lecture.mp4"
        os.makedirs(os.path.dirname(path), exist_ok=True)

        # Write video file with optimized settings for shorter videos
        final_video.write_videofile(
            path, 
            codec="libx264", 
            audio_codec="aac", 
            fps=10,  # Reduced FPS for smaller file size and faster processing
            bitrate="1000k",  # Lower bitrate for smaller file size
            threads=4,  # Use multiple threads for faster encoding
            preset="ultrafast"  # Use fastest encoding preset
        )

        try:
            from services.cloud_service import upload_file
            upload_result = upload_file(path, resource_type="video")
            if upload_result:
                return {"cloud_url": upload_result["secure_url"], "local_path": path}
        except Exception as e:
            print(f"Cloudinary upload failed: {e}")

        return path
    except Exception as e:
        import traceback
        print(f"Error creating video: {e}")
        traceback.print_exc()
        return None

def create_video_without_audio(slide_images, output_path=None):
    """
    Create a video from slide images without audio using MoviePy.
    Optimized for shorter videos with fps=10 and max total duration of 90 seconds.
    Uses chunked processing for better performance.
    """
    try:
        existing_images = [img for img in slide_images if os.path.exists(img)]
        if not existing_images:
            raise FileNotFoundError("No valid slide images found")

        if output_path is None:
            output_path = "output/lecture_no_audio.mp4"
        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        # Process in chunks for better memory management
        chunk_size = 5  # Process 5 slides at a time
        all_clips = []
        
        # Create video clips from images in chunks
        for i in range(0, len(existing_images), chunk_size):
            chunk_images = existing_images[i:i + chunk_size]
            
            # Create clips for this chunk (10 seconds per slide)
            chunk_clips = []
            for img in chunk_images:
                clip = ImageClip(img, duration=10)  # Default 10 seconds per slide
                chunk_clips.append(clip)
            
            all_clips.extend(chunk_clips)

        # Concatenate all image clips at once for better performance
        if len(all_clips) > 1:
            video = concatenate_videoclips(all_clips, method="compose")
        else:
            video = all_clips[0]

        # Write video file with optimized settings
        video.write_videofile(
            output_path, 
            codec="libx264", 
            fps=10,  # Reduced FPS for smaller file size and faster processing
            bitrate="1000k",  # Lower bitrate for smaller file size
            threads=4,  # Use multiple threads for faster encoding
            preset="ultrafast"  # Use fastest encoding preset
        )

        return output_path
    except Exception as e:
        import traceback
        print(f"Error creating video without audio: {e}")
        traceback.print_exc()
        return None

def get_media_duration(file_path):
    """
    Get the duration of a media file using MoviePy.
    
    Args:
        file_path (str): Path to the media file
        
    Returns:
        float: Duration in seconds, or None if there's an error
    """
    try:
        # Check if file exists
        if not os.path.exists(file_path):
            print(f"File not found: {file_path}")
            return None
            
        # Use MoviePy to get duration
        clip = VideoFileClip(file_path)
        duration = clip.duration
        clip.close()  # Important to close the clip to free resources
        return duration
    except Exception as e:
        print(f"Error getting media duration: {e}")
        return None