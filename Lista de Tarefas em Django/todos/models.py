from datetime import date
from django.db import models


class Todo(models.Model):
    # Não pode ser em branco e não pode ser nulo
    titulo = models.CharField(max_length=100, null=False, blank=False)
    criado_em = models.DateTimeField(auto_now_add=True, null=False, blank=False)
    data_entrega = models.DateField(null=False, blank=False)
    finalizado_em = models.DateField(null=True)

    class Meta:
        ordering = ["data_entrega"]

    def mark_as_complete(self):
        if not self.finalizado_em:
            self.finalizado_em = date.today()
            self.save()
