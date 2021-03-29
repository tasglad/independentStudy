
%load in data
data = readtable('fake_stress_data.csv');

%open file for writing
fileID = fopen('fake_stress_data.geojson','w');

%opener print
fprintf(fileID,'{"type":"FeatureCollection","features":[');

numRows = size(data,1);
for i = 1:numRows
    fprintf(fileID,'\n\t{"type":"Feature","properties":');
    %stress
    fprintf(fileID,'{"stress":%0.0f,',data.StressLevel(i));
    %time
    fprintf(fileID,' "time":"%s"},\n',data.Time{i});
    %coordiantes
    fprintf(fileID,' "geometry": {"type": "Point", "coordinates": ');
    fprintf(fileID,'[%f,%f]}}',data.Longtitude(i),data.Latitude(i));
    
    %add comma after all but last one
    if i ~= numRows
        fprintf(fileID,',');
    else
        fprintf('%f',i);
    end
end
%closing print
fprintf(fileID,']}');

%close file for writing
fclose(fileID);