import { useState, useEffect } from 'react';
import { getSongs, updateSongStatus } from './api/songs';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from './components/ui/table';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/card';

function App() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchSongs();
    // Poll for updates every 5 seconds
    const interval = setInterval(fetchSongs, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchSongs = async () => {
    try {
      const data = await getSongs();
      setSongs(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching songs:', error);
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    setUpdating(id);
    try {
      const updatedSong = await updateSongStatus(id, status);
      setSongs(songs.map(song => song.id === id ? updatedSong : song));
    } catch (error) {
      console.error('Error updating song:', error);
      alert('Failed to update song status');
    } finally {
      setUpdating(null);
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'declined':
        return 'destructive';
      case 'about_to_play':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'declined':
        return 'Declined';
      case 'about_to_play':
        return 'About to Play';
      case 'pending':
        return 'Pending';
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">DJ Song Requests</CardTitle>
            <CardDescription>
              Manage song requests from your Telegram bot
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading songs...</div>
            ) : songs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No song requests yet
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Song</TableHead>
                    <TableHead>Artist</TableHead>
                    <TableHead>Requester</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Requested At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {songs.map((song) => (
                    <TableRow key={song.id}>
                      <TableCell className="font-medium">
                        {song.song_title || 'N/A'}
                      </TableCell>
                      <TableCell>{song.artist || 'N/A'}</TableCell>
                      <TableCell>{song.requester_name || 'Anonymous'}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(song.status)}>
                          {getStatusLabel(song.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(song.created_at)}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant={song.status === 'approved' ? 'default' : 'outline'}
                            onClick={() => handleStatusUpdate(song.id, 'approved')}
                            disabled={updating === song.id}
                          >
                            {updating === song.id ? '...' : 'Approve'}
                          </Button>
                          <Button
                            size="sm"
                            variant={song.status === 'declined' ? 'destructive' : 'outline'}
                            onClick={() => handleStatusUpdate(song.id, 'declined')}
                            disabled={updating === song.id}
                          >
                            {updating === song.id ? '...' : 'Decline'}
                          </Button>
                          <Button
                            size="sm"
                            variant={song.status === 'about_to_play' ? 'secondary' : 'outline'}
                            onClick={() => handleStatusUpdate(song.id, 'about_to_play')}
                            disabled={updating === song.id}
                          >
                            {updating === song.id ? '...' : 'About to Play'}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;

