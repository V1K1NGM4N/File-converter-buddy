interface AnimatedFileTypeProps {
  fileType?: 'images' | 'videos' | 'files';
}

export const AnimatedFileType = ({ fileType }: AnimatedFileTypeProps) => {
  if (!fileType) {
    return null;
  }
  
  return (
    <span className="inline-block">
      {fileType}
    </span>
  );
};